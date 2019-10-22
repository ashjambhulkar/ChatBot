import boto3
import json
from botocore.vendored import requests

def lambda_handler(event, context):
    
    client = boto3.client('lex-runtime')
    response_lex = client.post_text(
    botName='PhotoFinder',
    botAlias="PhotoFinder",
    userId="test",
    inputText= event['query'].lower())
    print(event['query'].lower())
    print(response_lex)
    
    labels=[]
    if 'slots' in response_lex:
        if response_lex['slots']['topicOne'] is not None:
            labels.append(response_lex['slots']['topicOne'])
        if response_lex['slots']['topicTwo'] is not None:
            labels.append(response_lex['slots']['topicTwo'])
        
    pictures={'results':""}
    if labels:
        pictures['results']=find_images(labels)
    response = {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},
            "body": json.dumps(pictures),
            "isBase64Encoded": False
        }
    return response


def find_images(labels):
    results=[]
    host='https://vpc-photos-hwaarhxgs6sp2i67fqyjwdyg3y.us-east-1.es.amazonaws.com/photos/_search?q='
    for label in labels:
        if label:
            url=host+label
            response=requests.get(url)
            response=json.loads(response.text)
            
            if response['hits']['total'] == 0:
                continue
            else:
                response=response['hits']['hits']
                for i in range(max(5,len(response))):
                    results.append('https://s3.amazonaws.com/'+response[i]["_source"]["bucket"]+'/'+response[i]['_source']['objectKey'])
    return results
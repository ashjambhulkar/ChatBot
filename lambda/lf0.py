"""

cdt303 and sg5549

"""

import json
import boto3

def lambda_handler(event, context):
    ans=[]
    for key,val in event.items():
        ans.append(key)
        ans.append(val)
    uid="Test_619"   
    client = boto3.client('lex-runtime')
    response = client.post_text(
    botName='RestaurantFinderBot',
    botAlias='RestaurantFinderBot',
    userId=uid,
    inputText=event['message']
    )
    return {'statusCode': 200,'body': json.dumps(response['message'])}

    
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('I am still under Development. Please come back later.')
    # }
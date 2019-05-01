#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Downloads all tweets from a given user.

Uses twitter.Api.GetUserTimeline to retreive the last 3,200 tweets from a user.
Twitter doesn't allow retreiving more tweets than this through the API, so we get
as many as possible.

t.py should contain the imported variables.
"""

from __future__ import print_function


import json
import sys
sys.path.append('./lib')
import twitter
from t import ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET

# Get Parent Node
# Function: input the status_id of a tweet can put all the tweet between this tweet and the original tweet into the file 
# retweet_timeline.json and it is able to return all the ids of the tweets we have travesed.
# Return: All the status_id as int list including the input status_id
def get_parent_status(api=None, status_id=None):

    status_id_list = []
    tweet = api.GetStatus(status_id)
    f = open('./output/retweet_timeline.json', "w+")
    f.write(json.dumps(tweet._json))
    f.write('\n')
    status_id_list.append(int(status_id))

    while 'quoted_status_id_str' in tweet._json:

        retweet = api.GetStatus(tweet._json['quoted_status_id_str'])
        # print (retweet)
        tweet = retweet
        f.write(json.dumps(tweet._json))
        f.write('\n')
        status_id_list.append(int(tweet._json['id']))

    f.close()
    
    # Show the return result here 
    # print(tweet)
    # print (status_id_list)
    return status_id_list

# Get branch information
# input the id array of the tweet
# Return all the retweet of every tweet in the input in the form of id dictionary.
def get_all_branch_status(api=None, status_id_list=None):
    dict_id_relationship = {}
    for status_id in status_id_list:
        tweet = api.GetStatus(status_id)
        retweets = api.GetRetweets(str(status_id), count=100, trim_user=False)
        id_list = []
        for retweet in retweets:
            id_list.append(retweet._json['id'])
        dict_id_relationship[str(status_id)] = id_list
        # Show the return result here 
        # print(tweet)
    print (dict_id_relationship)
    return dict_id_relationship


def get_tweets(api=None, screen_name=None):
    timeline = api.GetUserTimeline(screen_name=screen_name, count=200)
    earliest_tweet = min(timeline, key=lambda x: x.id).id
    print("getting tweets before:", earliest_tweet)

    while True:
        tweets = api.GetUserTimeline(
            screen_name=screen_name, max_id=earliest_tweet, count=200
        )
        new_earliest = min(tweets, key=lambda x: x.id).id

        if not tweets or new_earliest == earliest_tweet:
            break
        else:
            earliest_tweet = new_earliest
            print("getting tweets before:", earliest_tweet)
            timeline += tweets

    return timeline


# Get the most popular ten tweet related to one topic (str)
def get_pop(api=None, topic=None):
    pop = api.GetSearch(term=topic, count=10, result_type='popular')






if __name__ == "__main__" and __package__ is None:

    api = twitter.Api(
        CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, sleep_on_rate_limit=True
    )
    topic = sys.argv[1]
    print(topic)
    pop = api.GetSearch(term=str(topic), count=int(10), result_type='popular')
    


    with open('./output/pop.json', 'w+') as f:
        for tweet in pop:
            f.write(json.dumps(tweet._json))
            f.write('\n')
    
#  Change the id here !!!!!!!!!!
    status_id_list = get_parent_status(api, '1117135227510501376')
    get_all_branch_status(api=api, status_id_list=status_id_list)














# Code not used but for reference.

    # # print (pop[0]._json['text'])

    # id_str = pop[3]._json['id_str']
    # print (pop[3]._json['text'])


    # retweets = api.GetRetweets(id_str, count=100, trim_user=False)
    # retweeters = api.GetRetweeters(id_str, cursor=True, count=1000, stringify_ids=False)
    # # print (retweeters)

    # with open('./retweet.json', 'w+') as f:
    #     for tweet in retweets:
    #         f.write(json.dumps(tweet._json))
    #         f.write('\n')

    # print (len(retweeters))

    # # for tweet in retweets:
    # #     print (tweet._json['retweet_count'])

    
        







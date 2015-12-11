#!/usr/bin/python

import redis
import httplib2
import json
from urllib import urlencode
from base64 import b64encode

BASE_COMMIT_HASH = "9e88b93d071c7f2b95d5263edae10b7683921257"
TOKEN = ""

def get(url):
    http = httplib2.Http()
    headers = {
        'User-agent': 'Codex',
        'Authorization': 'Basic %s' % b64encode('n0str:%s' % TOKEN)
    }
    try:
        head, body = http.request(url, headers=headers)
        if head["status"] == '200':
            return json.loads(body)
        else:
            print "HTTP status error: %s %s" % (head["status"], body)
    except:
        print "Error with HTTP request"
        exit()
    exit()

def update(r):
    last_commits = get("https://api.github.com/repos/codex-team/codex/commits/master")
    last_commit_sha = last_commits['sha']
    last_commit_date = last_commits['commit']['committer']['date']

    r.set('github/last_commit_date', last_commit_date)

    compare = get("https://api.github.com/repos/codex-team/codex/compare/%s...%s" % (BASE_COMMIT_HASH, last_commit_sha))
    commits_count = int(compare['ahead_by']) + 1

    r.set('github/commits_count', commits_count)

    c_list = []
    contributors = get("https://api.github.com/repos/codex-team/codex/stats/contributors")
    for contributor in contributors:
        author_login = contributor['author']['login']
        author_total = contributor['total']
        author_commits = get("https://api.github.com/repos/codex-team/codex/commits?author=%s" % author_login)
        author_last_commit_date = author_commits[0]['commit']['committer']['date']

        c_list.append(author_login)

        r.set('github/%s/total' % author_login, author_total)
        r.set('github/%s/last_commit_date' % author_login, author_last_commit_date)

    r.set('github/contributors', ','.join(c_list))

if __name__ == "__main__":
    TOKEN = open(".token").read().rstrip()
    
    r = redis.StrictRedis(host='localhost', port=6379, db=0, password='21gJs32hv3ks')
    update(r)
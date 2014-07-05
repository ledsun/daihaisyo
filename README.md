daihaisyo
=========

大拝承。承りたくなったときに使うWebアプリを作ります。大拝承！

## development

```
gem install compass
npm isntall
bower install
grunt serve
```

`gem install compass`は`sudo`が必要な場合あり。


## deployment

```
mkdir dist
cd dist
git init
git remote add heroku git@heroku.com:daihaisyo.git
git pull heroku master
cd ..
grunt build
cd dist
git add -A
git commit -m 'hogehoge'
git push heroku master
```

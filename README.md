gulpstrap
=========

[Gulp](https://github.com/wearefractal/gulp) config for [bootstrap](http://getbootstrap.com/), [nunjuck](http://jlongster.github.io/nunjucks/) templates, [jquery](http://jquery.com/), [less](http://lesscss.org/) & [browser-sync](http://www.browsersync.io/).

Dependencies
=========

Make sure you have Node.js & NPM from http://nodejs.org/.

Install Gulp globally. Open up your terminal

```
sudo npm install -g gulp
```

Getting Started
=========

Clone this as the base of your new project (then remove the .git directory)

```
git clone https://github.com/carlosl/gulpstrap.git YOUR_PROJECT
cd YOUR_PROJECT

# remove it from this git repo so you can init it with your own
rm -rf .git 
```

Install the dependencies for your project.

```
npm install
```
Now just run `npm start`.

or any of the specific gulp tasks

```
gulp build # builds the entire project
gulp publish # builds the project then ftps it (check /src/tasks/ftp.js for creds and settings)
```

Configuration
=========

Check out gulpconfig.json for config options.

more coming soon...

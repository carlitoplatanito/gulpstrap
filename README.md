gulpstrap
=========

[Gulp](https://github.com/wearefractal/gulp) config for [bootstrap](http://getbootstrap.com/), [nunjuck](http://jlongster.github.io/nunjucks/) templates, [jquery](http://jquery.com/), [less](http://lesscss.org/) & [livereload](http://livereload.com/).

Dependencies
=========

NPM, Gulp and a few others globally.

```
npm install -g gulp bower less nunjucks livereload
```

Getting Started
=========

Clone this as the base of your new project (then remove the .git directory)

```
git clone https://github.com/carlosl/gulpstrap.git YOUR_PROJECT
cd YOUR_PROJECT
rm -rf .git
```

Install the dependencies for your project then gulp

```
npm install
gulp #will compress everything and move files around
gulp watch #will compress and move stuff around, then watch your nunjuck templates, less & js files for changes
```

or any of the specific tasks

```
gulp watch
gulp bower
gulp scripts
gulp styles
gulp views
gulp images
gulp server # starts livereload
gulp lint # under construction
```

Note: If you have Atom(http://atom.io) install the NPM Install and Gulp Helper packages. You will then just have to open the project and npm will install all the packages automatically, then press CTRL + ALT + G for gulp watch to run in the inline terminal.

Configuration
=========

Check out gulpconfig.json for config options and to add or remove files to be watched.

more coming soon...

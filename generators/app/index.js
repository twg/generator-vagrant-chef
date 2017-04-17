'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the breathtaking ' + chalk.red('generator-vagrant-chef') + ' generator!'
    ));

    const prompts = [{
      type: 'list',
      name: 'UbuntuVersion',
      message: 'Select the Ubuntu version',
      default: 0,
      choices: [{
        name: 'ubuntu/xenial64 - Official Ubuntu Server 16.04 LTS (Xenial Xerus) builds',
        value: 'ubuntu/xenial64'
      }, {
        name: 'ubuntu/trusty64 - Official Ubuntu Server 14.04 LTS (Trusty Tahr) builds',
        value: 'ubuntu/trusty64'
      }
      ]
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};

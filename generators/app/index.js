'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-vagrant-chef') + ' generator!'
    ));

    const prompts = [{
      type: 'list',
      name: 'UbuntuVersion',
      message: 'Select the Ubuntu version',
      default: 0,
      choices: [{
        name: 'ubuntu/xenial64 - Official Ubuntu Server 16.04 LTS (Xenial Xerus)',
        value: 'ubuntu/xenial64'
      }, {
        name: 'ubuntu/trusty64 - Official Ubuntu Server 14.04 LTS (Trusty Tahr)',
        value: 'ubuntu/trusty64'
      }]
    }, {
      required: true,
      type: 'input',
      name: 'VmHostName',
      message: 'Hostname of VM?',
      default: 'api'
    }, {
      type: 'list',
      name: 'VmCpus',
      message: 'Select CPUs',
      default: 2,
      choices: [{
        name: '4 CPUs',
        value: '4'
      }, {
        name: '3 CPUs',
        value: '3'
      }, {
        name: '2 CPUs',
        value: '2'
      }, {
        name: '1 CPU',
        value: '1'
      }]
    }, {
      type: 'list',
      name: 'VmMemory',
      message: 'Select VM Memory Size',
      default: 2,
      choices: [{
        name: '8 GigaByte',
        value: '8192'
      }, {
        name: '4 GigaByte',
        value: '4096'
      }, {
        name: '2 GigaByte',
        value: '2048'
      }, {
        name: '1 GigaByte',
        value: '1024'
      }]
    }, {
      type: 'input',
      name: 'VmPrivateIp',
      message: 'Enter private network IP address',
      default: '10.0.0.10'
    }, {
      type: 'checkbox',
      name: 'VmSoftware',
      message: 'Select software to provision with Chef',
      choices: [{
        name: 'nodejs',
        value: 'nodejs',
        checked: true
      }, {
        name: 'postgresql',
        value: 'postgresql',
        checked: true
      }, {
        name: 'nginx',
        value: 'nginx',
        checked: false
      }, {
        name: 'redis-server',
        value: 'redis-server',
        checked: false
      }, {
        name: 'redis-client',
        value: 'redis-client',
        checked: false
      }]
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('Vagrantfile'),
      this.destinationPath('Vagrantfile'),
      this.props
    );
  }

};

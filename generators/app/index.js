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
        name: 'postgresql-server',
        value: 'postgresql-server',
        checked: true
      }, {
        name: 'postgresql-client',
        value: 'postgresql-client',
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
    // Copy chef files:
    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('postgresql-server') !== -1) {
      this.fs.copy(
        this.templatePath('files/tmp/postgresql_user.sql'),
        this.destinationPath('files/tmp/postgresql_user.sql')
      );
    }

    // Copy chef templates:
    this.fs.copyTpl(
      this.templatePath('templates/etc/environment.erb.ejs'),
      this.destinationPath('templates/etc/environment.erb'),
      this.props
    );

    this.fs.copy(
      this.templatePath('templates/etc/profile.d/prompt.sh.erb'),
      this.destinationPath('templates/etc/profile.d/prompt.sh.erb')
    );

    // Copy chef attributes:
    this.fs.copyTpl(
      this.templatePath('attributes/default.rb'),
      this.destinationPath('attributes/default.rb'),
      this.props
    );

    // Copy chef recipes:
    this.fs.copy(
      this.templatePath('recipes/setup-common.rb'),
      this.destinationPath('recipes/setup-common.rb')
    );

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('nodejs') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-nodejs.rb'),
        this.destinationPath('recipes/setup-nodejs.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('postgresql-server') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-postgresql-server.rb'),
        this.destinationPath('recipes/setup-postgresql-server.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('postgresql-client') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-postgresql-client.rb'),
        this.destinationPath('recipes/setup-postgresql-client.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('redis-server') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-redis-server.rb'),
        this.destinationPath('recipes/setup-redis-server.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('redis-client') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-redis-client.rb'),
        this.destinationPath('recipes/setup-redis-client.rb')
      );
    }

    // Copy files that belong in the root folder:
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('_README.md.ejs'),
      this.destinationPath('README.md'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('Vagrantfile.ejs'),
      this.destinationPath('Vagrantfile'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('Berksfile.ejs'),
      this.destinationPath('Berksfile'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('metadata.rb.ejs'),
      this.destinationPath('metadata.rb'),
      this.props
    );
  }

  install() {
    if (!this.options['skip-install']) {
      this.spawnCommand('berks', ['install']);
    }
  }

};

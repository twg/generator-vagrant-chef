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
        name: 'nginx (standalone)',
        value: 'nginx',
        checked: false
      }, {
        name: 'nodejs + npm',
        value: 'nodejs',
        checked: false
      }, {
        name: 'ruby + bundler',
        value: 'ruby',
        checked: false
      }, {
        name: 'nginx + passenger',
        value: 'passenger',
        checked: false
      }, {
        name: 'yarn',
        value: 'yarn',
        checked: false
      }, {
        name: 'elixir',
        value: 'elixir',
        checked: false
      }, {
        name: 'python',
        value: 'python',
        checked: false
      }, {
        name: 'pip',
        value: 'pip',
        checked: false
      }, {
        name: 'postgresql-server',
        value: 'postgresql-server',
        checked: false
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

  cookbookPath(path) {
    return this.destinationPath(`cookbooks/${this.props.VmHostName}_config/${path}`);
  }

  writing() {
    // Copy chef files:
    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('postgresql-server') !== -1) {
      this.fs.copy(
        this.templatePath('files/tmp/postgresql_user.sql'),
        this.cookbookPath('files/tmp/postgresql_user.sql')
      );
    }

    this.fs.copyTpl(
      this.templatePath('cookbook_metadata.rb.ejs'),
      this.cookbookPath('metadata.rb'),
      this.props
    );

    // Copy chef templates:
    this.fs.copyTpl(
      this.templatePath('templates/etc/environment.erb.ejs'),
      this.cookbookPath('templates/etc/environment.erb'),
      this.props
    );

    this.fs.copy(
      this.templatePath('templates/etc/profile.d/prompt.sh.erb'),
      this.cookbookPath('templates/etc/profile.d/prompt.sh.erb')
    );

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('nginx') !== -1) {
      this.fs.copy(
        this.templatePath('templates/etc/nginx/sites-enabled/default.erb'),
        this.cookbookPath('templates/etc/nginx/sites-enabled/default.erb')
      );
    }

    // Copy chef attributes:
    this.fs.copyTpl(
      this.templatePath('attributes/default.rb'),
      this.cookbookPath('attributes/default.rb'),
      this.props
    );

    // Copy chef recipes:
    this.fs.copy(
      this.templatePath('recipes/setup-common.rb'),
      this.cookbookPath('recipes/setup-common.rb')
    );

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('nginx') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-nginx.rb'),
        this.cookbookPath('recipes/setup-nginx.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('passenger') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-nginx-passenger.rb'),
        this.cookbookPath('recipes/setup-nginx-passenger.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('ruby') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-ruby.rb'),
        this.cookbookPath('recipes/setup-ruby.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('nodejs') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-nodejs.rb'),
        this.cookbookPath('recipes/setup-nodejs.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('yarn') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-yarn.rb'),
        this.cookbookPath('recipes/setup-yarn.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('elixir') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-elixir.rb'),
        this.cookbookPath('recipes/setup-elixir.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('python') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-python.rb'),
        this.cookbookPath('recipes/setup-python.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('pip') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-pip.rb'),
        this.cookbookPath('recipes/setup-pip.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('postgresql-server') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-postgresql-server.rb'),
        this.cookbookPath('recipes/setup-postgresql-server.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('postgresql-client') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-postgresql-client.rb'),
        this.cookbookPath('recipes/setup-postgresql-client.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('redis-server') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-redis-server.rb'),
        this.cookbookPath('recipes/setup-redis-server.rb')
      );
    }

    if (this.props.VmSoftware && this.props.VmSoftware.indexOf('redis-client') !== -1) {
      this.fs.copy(
        this.templatePath('recipes/setup-redis-client.rb'),
        this.cookbookPath('recipes/setup-redis-client.rb')
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

    this.fs.copy(
      this.templatePath('upload_cookbooks'),
      this.destinationPath('upload_cookbooks')
    );
  }

  install() {
    if (!this.options['skip-install']) {
      this.spawnCommand('berks', ['install']);
    }
  }

};

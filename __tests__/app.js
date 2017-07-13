'use strict';
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('vagrant-chef:app', function () {
  var getBaseFiles = function () {
    return [
      'cookbooks/api_config/templates/etc/environment.erb',
      'cookbooks/api_config/templates/etc/profile.d/prompt.sh.erb',
      'cookbooks/api_config/attributes/default.rb',
      'Vagrantfile',
      'README.md',
      'Berksfile',
      'metadata.rb'
    ];
  };

  var getBasePrompt = function () {
    return {
      UbuntuVersion: 'trusty',
      VmHostName: 'api',
      VmCpus: '2',
      VmMemory: '2048',
      VmPrivateIp: '10.0.0.1',
      VmSoftware: ''
    };
  };

  describe('default settings', function () {
    beforeEach(function (done) {
      this.app = helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(getBasePrompt())
        .on('end', done);
    });

    it('generates base files with no Chef recipes', function () {
      assert.file(getBaseFiles());
    });
  });

  describe('nodejs', function () {
    beforeEach(function (done) {
      var prompts = getBasePrompt();
      prompts.VmSoftware = 'nodejs';
      this.app = helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('generates nodejs Chef recipe', function () {
      assert.file(getBaseFiles());
      assert.file('cookbooks/api_config/recipes/setup-nodejs.rb');
    });

    it('includes setup-nodejs in the Vagrantfile Chef runlist', function () {
      assert.fileContent('Vagrantfile', /setup-nodejs/);
    });
  });

  describe('postgresql-server', function () {
    beforeEach(function (done) {
      var prompts = getBasePrompt();
      prompts.VmSoftware = 'postgresql-server';
      this.app = helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('generates postgresql-server chef recipe', function () {
      assert.file(getBaseFiles());
      assert.file('cookbooks/api_config/recipes/setup-postgresql-server.rb');
      assert.file('cookbooks/api_config/files/tmp/postgresql_user.sql');
    });

    it('includes setup-postgresql-server in the Vagrantfile Chef runlist', function () {
      assert.fileContent('Vagrantfile', /setup-postgresql-server/);
    });
  });

  describe('postgresql-server,postgresql-client', function () {
    beforeEach(function (done) {
      var prompts = getBasePrompt();
      prompts.VmSoftware = 'postgresql-server,postgresql-client';
      this.app = helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('generates postgresql-server and postgresql-client Chef recipes', function () {
      assert.file(getBaseFiles());
      assert.file('cookbooks/api_config/recipes/setup-postgresql-server.rb');
      assert.file('cookbooks/api_config/recipes/setup-postgresql-client.rb');
    });

    it('includes setup-postgresql-server and setup-postgersq-client in the Vagrantfile Chef runlist', function () {
      assert.fileContent('Vagrantfile', /setup-postgresql-server/);
      assert.fileContent('Vagrantfile', /setup-postgresql-client/);
    });
  });

  describe('redis-server', function () {
    beforeEach(function (done) {
      var prompts = getBasePrompt();
      prompts.VmSoftware = 'redis-server';
      this.app = helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('generates redis-server Chef recipe', function () {
      assert.file(getBaseFiles());
      assert.file('cookbooks/api_config/recipes/setup-redis-server.rb');
    });

    it('includes setup-redis-server in the Vagrantfile Chef runlist', function () {
      assert.fileContent('Vagrantfile', /setup-redis-server/);
    });
  });

  describe('redis-server,redis-client', function () {
    beforeEach(function (done) {
      var prompts = getBasePrompt();
      prompts.VmSoftware = 'redis-server,redis-client';
      this.app = helpers
        .run(require.resolve('../generators/app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('generates redis-server and redis-client Chef recipes', function () {
      assert.file(getBaseFiles());
      assert.file('cookbooks/api_config/recipes/setup-redis-server.rb');
      assert.file('cookbooks/api_config/recipes/setup-redis-client.rb');
    });

    it('includes setup-redis-server in the Vagrantfile Chef runlist', function () {
      assert.fileContent('Vagrantfile', /setup-redis-server/);
      assert.fileContent('Vagrantfile', /setup-redis-client/);
    });
  });
});

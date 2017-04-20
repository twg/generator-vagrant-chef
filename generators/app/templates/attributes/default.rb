node.default['common']['deploy_user'] = 'deploy'
node.default['common']['deploy_user_password'] = 'deploy'
node.default['common']['deploy_group'] = 'deploy'
node.default['common']['deploy_user_home'] = '/home/deploy'

<% if (VmSoftware.indexOf('nodejs') !== -1) { %>
node.default['nodejs']['version'] = '6.10.2'
node.default['nodejs']['source']['checksum'] = 'b519cd616b0671ab789d2645c5c026deb7e016d73a867ab4b1b8c9ceba9c3503'
node.default['nodejs']['binary']['checksum'] = 'b519cd616b0671ab789d2645c5c026deb7e016d73a867ab4b1b8c9ceba9c3503'
<% } %>

<% if (VmSoftware.indexOf('postgresql') !== -1) { %>
node.default['postgresql']['version'] = '9.6'
node.default['postgresql']['dir'] = '/etc/postgresql/9.6/main'
node.default['postgresql']['config']['dynamic_shared_memory_type'] = 'sysv'
node.default['postgresql']['password']['postgres'] = 'deploy'
node.default['postgresql']['client']['packages'] = ['postgresql-client-9.6', 'libpq-dev']
node.default['postgresql']['server']['packages'] = ['postgresql-9.6']
node.default['postgresql']['contrib']['packages'] = ['postgresql-contrib-9.6']
<% } %>

node.default['common']['env'] = 'development'

node.default['common']['deploy_user'] = 'deploy'
node.default['common']['deploy_user_password'] = 'deploy'
node.default['common']['deploy_group'] = 'deploy'
node.default['common']['deploy_user_home'] = '/home/deploy'

<% if (VmSoftware && VmSoftware.indexOf('nodejs') !== -1) { %>
node.default['nodejs']['version'] = '6.11.1'
node.default['nodejs']['source']['checksum'] = 'e68cc956f0ca5c54e7f3016d639baf987f6f9de688bb7b31339ab7561af88f41'
node.default['nodejs']['binary']['checksum'] = 'e68cc956f0ca5c54e7f3016d639baf987f6f9de688bb7b31339ab7561af88f41'
<% } %>

<% if (VmSoftware && VmSoftware.indexOf('postgresql-server') !== -1) { %>
node.default['postgresql']['version'] = '9.6'
node.default['postgresql']['dir'] = '/etc/postgresql/9.6/main'
node.default['postgresql']['config']['dynamic_shared_memory_type'] = 'sysv'
node.default['postgresql']['password']['postgres'] = 'deploy'
node.default['postgresql']['client']['packages'] = ['postgresql-client-9.6', 'libpq-dev']
node.default['postgresql']['server']['packages'] = ['postgresql-9.6']
node.default['postgresql']['contrib']['packages'] = ['postgresql-contrib-9.6']
<% } %>

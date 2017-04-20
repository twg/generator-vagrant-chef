include_recipe 'postgresql::server'

cookbook_file '/tmp/postgresql_user.sql' do
  source 'tmp/postgresql_user.sql'
  owner 'postgres'
  group 'postgres'
  mode '0755'
  action :create
end

execute 'create deploy user' do
  command '/usr/bin/psql < /tmp/postgresql_user.sql'
  user 'postgres'
end

package 'nginx'

file '/etc/nginx/sites-enabled/default' do
  action :delete
end

template '/etc/nginx/sites-enabled/default' do
  source 'etc/nginx/sites-enabled/default.erb'
  variables(
    environment: node['common']['env'])
  action :create
end

service 'nginx' do
  action :restart
end

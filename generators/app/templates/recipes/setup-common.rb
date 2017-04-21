group node['common']['deploy_group']

user node['common']['deploy_user'] do
  group node['common']['deploy_group']
  home node['common']['deploy_user_home']
  system true
  shell '/bin/bash'
  password node['common']['deploy_user_password']
end

directory node['common']['deploy_user_home'] do
  owner node['common']['deploy_user']
  group node['common']['deploy_group']
  mode '0755'
  action :create
end

sudo node['common']['deploy_user'] do
  user node['common']['deploy_user']
  nopasswd true
end

template '/etc/environment' do
  source 'etc/environment.erb'
  variables(
    environment: node['common']['env'])
  action :create
end

template '/etc/profile.d/prompt.sh' do
  source 'etc/profile.d/prompt.sh.erb'
  action :create
  mode '0644'
  owner 'root'
  group 'root'
  backup 0
end

package 'python'
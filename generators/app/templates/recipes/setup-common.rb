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
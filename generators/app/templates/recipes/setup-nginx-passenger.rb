bash "Installing Phusion Passenger and nginx" do
  code <<-EOF
  sudo apt-get install -y dirmngr gnupg
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
  sudo apt-get install -y apt-transport-https ca-certificates
  sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger #{node['lsb']['codename']} main > /etc/apt/sources.list.d/passenger.list'
  sudo apt-get update
  sudo apt-get install -y nginx-extras passenger
  EOF
end

service 'nginx' do
  action :restart
end

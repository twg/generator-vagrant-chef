package 'python-pip'

execute "upgrade_pip" do
  command "pip install --upgrade pip"
end

apt_repository 'brightbox-ruby-ng' do
  uri 'http://ppa.launchpad.net/brightbox/ruby-ng/ubuntu'
  distribution node['lsb']['codename']
  components ['main']
  keyserver 'keyserver.ubuntu.com'
  key 'C3173AA6'
end

apt_preference 'ruby-ng-01-disable_by_default' do
  glob '*'
  pin 'release o=LP-PPA-brightbox-ruby-ng'
  pin_priority '-1'
end

apt_preference 'ruby-ng-02-enable_for_ruby' do
  glob 'ruby* libruby*'
  pin 'release o=LP-PPA-brightbox-ruby-ng'
  pin_priority '666'
end

package "ruby#{node['common']['ruby_version']}"
package "ruby#{node['common']['ruby_version']}-dev"

execute 'bundler' do
  command 'gem install bundler'
end

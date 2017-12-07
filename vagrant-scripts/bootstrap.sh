#!/usr/bin/env bash

# Use single quotes instead of double quotes to make it work with special-character passwords
PASSWORD='devserver'

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade

sudo apt-get install -y vim curl python-software-properties

# install apache 2.5 and php 5.5
sudo apt-get install -y apache2 libapache2-mod-php5

echo -e "\n--- Configuring apache web server ---\n"
# setup hosts file
sudo rm -f /etc/apache2/sites-available/000-default.conf
sudo rm -f /etc/apache2/sites-enabled/000-default.conf
sudo cp /home/vagrant/scripts/resources/default /etc/apache2/sites-available/000-default.conf
sudo ln -s /etc/apache2/sites-available/default /etc/apache2/sites-enabled/000-default.conf

# enable mod_rewrite
sudo a2enmod rewrite

#setting apache user to vargant
APACHEUSR=`grep -c 'APACHE_RUN_USER=www-data' /etc/apache2/envvars`
APACHEGRP=`grep -c 'APACHE_RUN_GROUP=www-data' /etc/apache2/envvars`
if [ APACHEUSR ]; then
    sed -i 's/APACHE_RUN_USER=www-data/APACHE_RUN_USER=vagrant/' /etc/apache2/envvars
fi
if [ APACHEGRP ]; then
    sed -i 's/APACHE_RUN_GROUP=www-data/APACHE_RUN_GROUP=vagrant/' /etc/apache2/envvars
fi
sudo chown -R vagrant:vargant /var/lock/apache2

# restart apache
service apache2 restart

echo -e "\n--- Installing git ---\n"
# install git
sudo apt-get -y install git


echo "Installing Bower and Grunt"
sudo apt-get install -y nodejs-dev nodejs nodejs-legacy npm
sudo npm install -g bower
sudo npm install -g grunt-cli

echo "[vagrant provisioning] Configuring vagrant box..."
usermod -a -G vagrant www-data # adds vagrant user to www-data group
chmod 0600 /home/vagrant/.ssh/authorized_keys

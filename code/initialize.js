const core = require('@actions/core');
const axios = require('axios');

const Initializer = class {
  async initialize() {
    const existingRules = await this._retrieveExistingRules();
    core.saveState('originalRules', existingRules);
    const runnerIP = await this._getRunnerIP();
    core.saveState('runnerIP', runnerIP);
  }

  async _retrieveExistingRules() {
    let url = `https://api.hetzner.cloud/v1/firewalls/${(core.getInput('firewall-id'))}`;
    let headers = {
      'Authorization': `Bearer ${(core.getInput('api-token'))}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, {headers: headers});
      core.info('Current firewall rules retrieved.');
      return JSON.stringify(response.data.firewall.rules);
    } catch (error) {
      core.setFailed(`Retrieval of existing rules failed with error: ${error}`);
      console.log(error.toJSON());
    }
  }

  async _getRunnerIP() {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json', {headers: {'Content-Type': 'application/json'}});
      const ip = response.data.ip;
      core.info(`IPv4 retrieved: ${ip}`);
      return ip;
    } catch (error) {
      core.setFailed(`Retrieval of existing rules failed with error: ${error}`);
      console.log(error.toJSON());
    }
  }
}

new Initializer().initialize();

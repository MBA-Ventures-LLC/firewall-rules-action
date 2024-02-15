const core = require('@actions/core');
const axios = require('axios');

const Restorer = class {
  async restoreFirewallRules() {
    let url = `https://api.hetzner.cloud/v1/firewalls/${core.getInput('firewall-id')}/actions/set_rules`
    let headers = {
      'Authorization': `Bearer ${(core.getInput('api-token'))}`,
      'Content-Type': 'application/json',
    };
    const originalRules = JSON.parse(core.getState('originalRules'));

    try {
      const response = await axios
        .post(
          url,
          {rules: originalRules},
          {headers: headers}
        );
      core.info('Firewall rules restored.');
    } catch (error) {
      core.setFailed(`Restoration of firewall rules failed with error: ${error}`);
    }
  }
}

new Restorer().restoreFirewallRules();

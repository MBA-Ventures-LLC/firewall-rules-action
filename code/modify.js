const core = require('@actions/core');
const axios = require('axios');

const Modifier = class {
  async updateFirewallRules() {
    let url = `https://api.hetzner.cloud/v1/firewalls/${core.getInput('firewall-id')}/actions/set_rules`
    let headers = {
      'Authorization': `Bearer ${(core.getInput('api-token'))}`,
      'Content-Type': 'application/json',
    };
    const updatedRules = this._buildUpdatedRulesUsingRunnerIP();

    try {
      const response = await axios.post(url, {rules: updatedRules}, {headers: headers});
      core.info('Firewall rules updated.');
    } catch (error) {
      core.setFailed(`Update of firewall rules failed with error: ${error}`);
      console.log(error.toJSON());
    }
  }

  _buildUpdatedRulesUsingRunnerIP() {
    const originalRules = JSON.parse(core.getState('originalRules'));
    const runnerIP = core.getState('runnerIP');
    const updatedRules = [];

    for (let rule of originalRules) {
      const ruleToUpdate = Object.assign({}, rule);
      if (rule.direction === 'in' && rule.protocol === 'tcp' && rule.port === '30022') {
        ruleToUpdate.source_ips.push(`${runnerIP}/32`);
      }
      updatedRules.push(ruleToUpdate);
    }

    return updatedRules;
  }
}

new Modifier().updateFirewallRules();

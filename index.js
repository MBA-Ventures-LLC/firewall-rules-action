const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const apiToken = core.getInput('api-token');
    const firewallId = core.getInput('firewall-id');
    const rules = JSON.parse(core.getInput('rules'));

    await axios.post(
      `https://api.hetzner.cloud/v1/firewalls/${firewallId}/actions/set_rules`,
      { rules },
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    core.info('Firewall rules updated successfully');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();

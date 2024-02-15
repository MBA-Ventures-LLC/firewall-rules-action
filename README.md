# Firewall Rules Action

This GitHub Action updates the firewall rules on Hetzner Cloud. It allows you to dynamically modify the firewall rules based on your workflow needs, such as adding a temporary rule to allow access from a GitHub runner.

## Inputs

### `api-token`

**Required** Hetzner Cloud API token.

### `firewall-id`

**Required** The ID of the firewall to update.

### `rules`

**Required** JSON array of firewall rules to apply.

## Outputs

No outputs.

## Example usage

```yaml
- name: Update Firewall Rules
  uses: your-username/firewall-rules-action@v1
  with:
    api-token: ${{ secrets.HETZNER_TOKEN }}
    firewall-id: 'xxxxxxx'
    rules: ${{ toJson(env.UPDATED_RULES) }}

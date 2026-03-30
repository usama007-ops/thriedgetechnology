#!/usr/bin/env node

/**
 * Configuration Verification Script
 * Validates all environment variables and API connectivity
 */

const chalk = require('chalk');

console.log('\n' + chalk.blue.bold('=== Configuration Verification ===\n'));

// Check environment variables
const requiredVars = [
  'NEXT_PUBLIC_WORDPRESS_URL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
];

const optionalVars = [
  'REVALIDATE_SECRET',
  'CACHE_SECRET',
];

let allValid = true;

console.log(chalk.cyan('Required Environment Variables:'));
requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    const masked = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(chalk.green(`✓ ${varName}`), `(${masked})`);
  } else {
    console.log(chalk.red(`✗ ${varName}`), '(NOT SET)');
    allValid = false;
  }
});

console.log('\n' + chalk.cyan('Optional Environment Variables:'));
optionalVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    const masked = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(chalk.green(`✓ ${varName}`), `(${masked})`);
  } else {
    console.log(chalk.yellow(`⚠ ${varName}`), '(not set)');
  }
});

// Test WordPress connectivity
console.log('\n' + chalk.cyan('Testing WordPress Connectivity:'));
const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
if (wpUrl) {
  const apiUrl = `${wpUrl}/wp-json/wp/v2/posts?per_page=1`;
  console.log(chalk.gray(`Testing: ${apiUrl}`));
  
  fetch(apiUrl)
    .then(res => {
      if (res.ok) {
        console.log(chalk.green('✓ WordPress API is reachable'));
      } else {
        console.log(chalk.red(`✗ WordPress API returned ${res.status}`));
      }
    })
    .catch(err => {
      console.log(chalk.red('✗ Failed to connect to WordPress'));
      console.log(chalk.gray(`  Error: ${err.message}`));
    });
}

// Test Redis connectivity
console.log('\n' + chalk.cyan('Testing Redis Connectivity:'));
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (redisUrl && redisToken) {
  console.log(chalk.gray(`Testing: ${redisUrl}`));
  
  fetch(`${redisUrl}/ping`, {
    headers: {
      'Authorization': `Bearer ${redisToken}`,
    },
  })
    .then(res => {
      if (res.ok) {
        console.log(chalk.green('✓ Redis connection is valid'));
      } else {
        console.log(chalk.red(`✗ Redis returned ${res.status}`));
      }
    })
    .catch(err => {
      console.log(chalk.red('✗ Failed to connect to Redis'));
      console.log(chalk.gray(`  Error: ${err.message}`));
    });
}

console.log('\n' + (allValid ? chalk.green('All required variables are set!') : chalk.red('Some required variables are missing!')));
console.log(chalk.blue.bold('\n=== End Verification ===\n'));

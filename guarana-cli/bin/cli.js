#!/usr/bin/env node

import { createApp } from '../src/index.js';

const args = process.argv.slice(2);

createApp(args);

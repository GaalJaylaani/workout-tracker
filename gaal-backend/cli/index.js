#!/usr/bin/env node

import { program } from 'commander';
import { loginCommand  } from './commands/login.js'
import { workoutCommand } from './commands/workout.js'
import { mealsCommand } from './commands/meals.js'
import { plateauCommand } from './commands/plateau.js'

loginCommand(program)
workoutCommand(program)
mealsCommand(program)
plateauCommand(program)


program.parse()
// Core
import { AnyAction } from 'redux';
import { format } from 'date-fns';
import chalk from 'chalk';


// Logger
import { developmentLogger } from './logger';

export const serverReduxLogger = () => (next: (arg: any) => void) => (action: AnyAction) => {
  developmentLogger.info(
    chalk.green(`redux [${format(new Date(), 'dd-MM-yyyy HH:mm:ss')}]: action "${
      action.type
    }" dispatched with payload ${JSON.stringify(action.payload)}`),
  );

  next(action);
};

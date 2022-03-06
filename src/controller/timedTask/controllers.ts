import db from '../../mongodb';
import { faildRes } from './../../errorHandler';
import { MISSING_PARAMS } from './../../errorTypes';
import { hasKeys } from './../../share';
import { UserAuthentication } from './../../types';

const TIMED_TASKS_COLLECTION = 'timedTasks'

const timedTasksModel = db.collection(TIMED_TASKS_COLLECTION)

export const createTimedTask = async (data: UserAuthentication) => {
  if (hasKeys(data, 'token')) {
    return faildRes(MISSING_PARAMS)
  }

  
}
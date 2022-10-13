const getTestTitle = require('../getTestTitle');
const { getSnapshotTitle } = require('../snapshotTitles');
const { getTestForTask, getSubject, isHtml } = require('./index');
const { COMMAND_MATCH_IMAGE_SNAPSHOT } = require('../../commands/commandNames');
const { TYPE_IMAGE, TYPE_JSON, TYPE_HTML } = require('../../dataTypes');

function isImage(commandName) {
  return commandName === COMMAND_MATCH_IMAGE_SNAPSHOT;
}

function getDataType({ commandName, subject }) {
  if (isImage(commandName)) {
    return TYPE_IMAGE;
  }

  return isHtml(subject) ? TYPE_HTML : TYPE_JSON;
}

function getTaskData({
  commandName,
  options,
  customName,
  customSeparator,
  subject: testSubject,
  attemptNumber
} = {}) {
  const subjectIsImage = isImage(commandName);
  const test = getTestForTask();
  const testTitle = getTestTitle(test);
  const spec = Cypress.spec;
  const testFile = spec.absolute;
  const snapshotTitle = getSnapshotTitle(test, customName, customSeparator, subjectIsImage, attemptNumber);
  const subject = subjectIsImage ? testSubject : getSubject(testSubject);
  const dataType = getDataType({ commandName, subject: testSubject });

  return {
    commandName,
    dataType,
    options,
    snapshotTitle,
    subject,
    testFile,
    testTitle,
  };
}

module.exports = getTaskData;

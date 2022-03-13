import { v4 as uuid } from "uuid";

const savedToDo = [
  {
    id: uuid(),
    content:
      "Currently, when sharing email, the user must hit return after entering an email address. Without hitting return, the email remains visible and the user is allowed to share the post but email is not sent. Find a solution to 'auto-complete' the email if the user leaves the user field.",
  },
  { id: uuid(), content: "3D Analysis will be more good. Canvas" },
];

const savedInProgress = [
  {
    id: uuid(),
    content:
      "Task management stuff almost completed and code is very important. Best practices must be followed.",
  },
];

const savedDone = [
  {
    id: uuid(),
    content:
      "Post comment and title should be made optional and remove extra stuff.",
  },
];

export const savedColumns = {
  toDo: {
    name: "To do",
    items: savedToDo,
  },
  inProgress: {
    name: "In Progress",
    items: savedInProgress,
  },
  done: {
    name: "Done",
    items: savedDone,
  },
};

import FireController from "./FireController";

import { HistoryController, ProjectController } from ".";
import collections from "../../mocks/data";

import type { IUser, IFirebaseUser } from "../../../types";
import { UserSchema } from "../../../lib/schemas";

class Controller extends FireController<IUser> {
  constructor() {
    super({
      ref: "users",
      schema: UserSchema,
      _name: "User",
      _data: collections.user,
    });
  }

  public async create(data: IUser, _id: string): Promise<IUser> {
    await this.Validator(data);

    await HistoryController.init(_id);
    await ProjectController.init(_id);

    const user = await super.create(data, _id);

    return { ...user };
  }

  public assembleUser(user: IFirebaseUser) {
    return {
      id: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
      email: user.email,
      countCreatedTasks: 0,
    };
  }

  public ErrorAccountExists(code: string) {
    return code === "auth/account-exists-with-different-credential";
  }
}

const UserController = new Controller();

export default UserController;

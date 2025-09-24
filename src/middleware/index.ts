import { stackMiddlewares } from "./stackHandler";
import { authMiddlewareFactory } from "./auth";
import { localesMiddlewareFactory } from "./locales";

const middlewares = [authMiddlewareFactory, localesMiddlewareFactory];
export default stackMiddlewares(middlewares);
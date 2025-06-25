import { stackMiddlewares, authMiddlewareFactory, localesMiddlewareFactory } from "@/utils/middlewares";

const middlewares = [authMiddlewareFactory, localesMiddlewareFactory];
export default stackMiddlewares(middlewares);
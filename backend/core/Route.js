const Express = require("express")
const { log } = require("middleware/logging")

/*
 * example require controller
 */
const ExampleController = require("controllers/example.controller.js")
const LessonsController = require("controllers/lessons.controller.js")

const router = Express.Router()
class Route {
    init() {
        return [
            this.get("/", (req, res, next) =>
                new ExampleController(req, res, next).index()
            ),
						this.get("/:lesson/:slug", (req, res, next) =>
                new LessonsController(req, res, next).findWithMateries()
            ),
            this.get("/lessons", (req, res, next) =>
                new LessonsController(req, res, next).index()
            ),
        ]
    }

    // eslint-disable-next-line class-methods-use-this
    get(...args) {
        // add middleware log
        args.push(log)
        return router.get(...args)
    }
}

exports.Route = Route

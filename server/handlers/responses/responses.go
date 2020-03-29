/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package response

var (
	Http200OK            = map[string]interface{}{"message": "OK"}
	Http400WrongRequest  = map[string]interface{}{"message": "Wrong request"}
	Http403Forbidden     = map[string]interface{}{"message": "Forbidden"}
	Http404UserNotFound  = map[string]interface{}{"message": "User not found or wrong password"}
	Http404PageNotFound  = map[string]interface{}{"message": "Page not found"}
	Http500InternalError = map[string]interface{}{"message": "Internal server error"}
)

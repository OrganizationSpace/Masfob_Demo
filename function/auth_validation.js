const validateRoles = (allowedRoles) => (req, res, next) => {
	const requesterRole = req.role

	if (!allowedRoles.includes(requesterRole)) {
		const allowedRolesString = allowedRoles.join(' or ')
		return res
			.status(403)
			.json({
				message: `Only ${allowedRolesString} users are allowed to perform this action`,
			})
	}

	next()
}

module.exports = validateRoles
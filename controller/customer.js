const Customer_ = require('../schema/customer')

class Customer {
	async add({
		workspace,
		name,
		display_name,
		email,
		password,
		phone_number,
		country_code,
		tags,
		labels,
		dob,
	}) {
		try {
			const result = await new Customer_({
				workspace,
				name,
				display_name,
				email,
				password,
				phone_number,
				country_code,
				tags: tags,
				labels: labels,
				dob: dob,
			}).save()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async import(Customers) {
		try {
			const result = await Customer_.insertMany(Customers,{ordered:false})
			return result
		} catch (error) {
			//////
			console.log(error)
		}
	}

	async list({ workspace }) {
		try {
			//check the query
			const result = await Customer_.find({ workspace }).lean()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	async listBirth({ workspace }) {
		try {
			const currentDate = new Date();
			const currentDay = currentDate.getDate();
			const currentMonth = currentDate.getMonth() + 1;
		console.log("333333333333333333");
		   console.log(currentDate);
		   console.log(currentDay);
			console.log(currentMonth);
		
  
			const result = await Customer_.find({
			  workspace,
			  $expr: {
				$and: [
				  { $eq: [{ $dayOfMonth: "$dob" }, currentDay] },
				  { $eq: [{ $month: "$dob" }, currentMonth] }
				]
			  }
			}).lean();
	  console.log(result);
		  return result;
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  }

	async existingNumber({ workspace, phone_number }) {
		try {
			const result = await Customer_.findOne({ workspace, phone_number }).lean()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async existingMail({ workspace, email }) {
		try {
			const result = await Customer_.findOne({ workspace, email }).lean()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	// async updateCustomer({phone_number, workspace, newData}) {
	//     try {
	//         //check the query
	//         const updatedCustomer = await Customer.findOneAndUpdate(
	//             { phone_number: phone_number, workspace: workspace },
	//             newData,
	//             { new: true }
	//         )

	//         if (!updatedCustomer) {
	//             throw new Error('Customer not found')
	//         }

	//         return { updatedCustomer }
	//     } catch (error) {
	//         console.error(error)
	//         throw error
	//     }
	// }

	async update({
		_id,
		phone_number,
		workspace,
		name,
		display_name,
		email,
		password,
		country_code,
		tags,
	}) {
		try {
			// check the query
			const result = await Customer_.findOneAndUpdate(
				{ _id: _id, workspace: workspace },
				{
					$set: {
						name: name,
						email: email,
						password: password,
						phone_number: phone_number,
						display_name: display_name,
						country_code: country_code,
						tags: tags,
					},
				},
				{ new: true , upsert: true }
			)

			//console.log("customer",result);
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async delete({ workspace, _id }) {
		try {
			//test the query
			const result = await Customer_.deleteMany({
				workspace: workspace,
				_id: { $in: _id },
			})

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	//the function work with phone_number based label assign with all function
	async assignLabel({ workspace, labels, _id }) {
		try {
			const result = await Customer_.updateMany(
				{ workspace: workspace, _id: { $in: _id } },
				{ $set: { labels: labels } }
			)

			if (result.nModified === 0) {
				throw new Error('No customers found or updated')
			}

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	//the function work with label/assign in _id based
	// async  assignLabelv2({ workspace, ids, labels }) {
	//     try {
	//         const result = await Customer_.updateMany(
	//             { workspace: workspace, _id: { $in: ids } },
	//             { $set: { labels:  labels } }
	//         );

	//         if (result.nModified === 0) {
	//             throw new Error('No customers found or updated');
	//         }

	//         console.log(result);
	//         return result;
	//     } catch (error) {
	//         console.error(error);
	//         throw error;
	//     }
	// }
	// async  revomeLabel({ workspace, labels }) {
	//     try {
	//         const result = await Customer_.findOneAndUpdate(
	//             { workspace: workspace },
	//             { $pull: { labels: labels } },
	//             { new: true }
	//         );
	// console.log("customer:",result);
	//         return  result ;
	//     } catch (error) {
	//         console.error(error);
	//         throw error;
	//     }
	// }
	async revomeLabel({ workspace, labels, session }) {
		try {
			const result = await Customer_.updateMany(
				{ workspace: workspace },
				{ $pull: { labels: labels } },
				{ new: true, session: session }
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async findOptInOut({ workspace }) {
		try {
			const result = await Customer_.find(
				{
					workspace: workspace,
					opt_out: true,
				},
				{ phone_number: 1, country_code: 1, _id: 0 }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listTest({ workspace,currentDate }) {
		try {
			//check the query
			const result = await Customer_.find({ workspace,DOB:currentDate }).lean()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

}
module.exports = Customer

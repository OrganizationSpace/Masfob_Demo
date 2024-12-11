async function Removelabel(workspace, phone_number,labels) {
    try {
        const updatedContact = await Contact.findOneAndUpdate(
            {
                workspace: workspace,
                phone_number: phone_number,
            },
            {
                $pull: { labels: labels },
            },
            { new: true }
        );

        if (!updatedContact) {
            throw new Error('Contact not found');
        }

        return { updatedContact };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = Removelabel
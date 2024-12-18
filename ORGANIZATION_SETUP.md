# Manual Organization Setup Process

## Prerequisites

- Access to MongoDB database
- Node.js installed
- Project dependencies installed

## Steps to Create an Organization

1. **Receive Application Email**

   - Application details will be sent to info@charitably.in
   - Review the organization details, admin info, and mission

2. **Create Organization Using Script**

   - Navigate to project root
   - Open Node.js REPL:

   ```bash
   node
   ```

   - Run the following commands:

   ```javascript
   const { createOrganization } = require("./scripts/create-organization");

   // Replace values with actual application data
   await createOrganization({
     name: "Organization Name from Application",
     description: "Description from Application",
     taxId: "TAXID12345", // Get Tax ID from follow-up communication
   });
   ```

3. **Link User to Organization**

   - If the admin user already exists (has logged in before):

   ```javascript
   const { PrismaClient } = require("@prisma/client");
   const prisma = new PrismaClient();

   await prisma.user.update({
     where: { email: "admin@email.com" }, // Email from application
     data: {
       organizationId: "org_id_from_step_2",
     },
   });
   ```

4. **Send Welcome Email**
   - Send confirmation to the organization admin
   - Include:
     - Login instructions
     - Next steps for setting up their profile
     - Link to documentation

## Important Notes

- Always verify tax ID before creating organization
- Keep organization ID and admin email for records
- Monitor first login and assist if needed

## Checklist

- [ ] Review application
- [ ] Verify tax ID
- [ ] Create organization
- [ ] Link admin user
- [ ] Send welcome email
- [ ] Document in internal records

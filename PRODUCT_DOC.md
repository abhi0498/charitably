# **Product Documentation: Charitably**

## **Introduction**

**Charitably** (alternative names: _DonorPath_, _ImpactTrace_, _GiveTrack_) is a platform designed to foster trust and transparency in charitable giving. It enables users to donate to charitable organizations and events while providing a detailed breakdown of how their contributions are utilized.

The platform supports two personas: donors (users) and charitable organizations. Donors can view organizations, donate to causes, and track their contributions. Organizations can create funding requests, post events, and provide detailed reports on donation usage.

---

## **Technology Stack**

- **Frontend**: Next.js 15 (with App Router)
- **Backend**: Node.js with Prisma ORM, MongoDB
- **Authentication**: NextAuth.js or Auth0
- **Payments**: Stripe or PayPal
- **Hosting**: Vercel (optimized for Next.js)
- **Notifications**: SendGrid or AWS SES
- **Data Visualization**: D3.js or Chart.js
- **Caching**: Redis (optional, for performance optimization)

---

## **Personas**

### **1. User (Donor)**

- **Primary Goals**:
  - Discover charitable organizations and events.
  - Donate directly to organizations, events, or specific funding requests.
  - Track and visualize how their donations are utilized.

### **2. Charitable Organization**

- **Primary Goals**:
  - Register and manage their organization profile.
  - Create and manage funding requests and events.
  - Provide transparent reports on donation utilization to maintain donor trust.

---

## **Features**

### **1. Home Page**

- Displays a list of charitable organizations and events using geolocation to highlight nearby causes.
- Search and filter functionality to refine results based on categories, location, or keywords.

### **2. Donation Options**

- **Event/Request-Specific Donations**:
  - Donors can contribute directly to events or funding requests with a clear purpose.
  - Spending is tracked and reported in relation to the specific event or request.
- **General Donations**:
  - Donors can contribute to an organization’s general fund.
  - Organizations allocate these funds across various categories like food, clothing, and general operations. Proportional tracking ensures transparency.

### **3. Donation Tracking System**

Every donation is uniquely identified and tracked to provide detailed usage reports.

- **Event-Specific Tracking**: Shows how donations were spent on a specific event or funding request.
- **General Donation Tracking**:
  - Donations are tagged to expenses across categories.
  - Proportional tracking ensures fairness when multiple donors contribute to the general fund.
  - Example:
    - User A donates $100; User B donates $50.
    - Organization spends $30 on food and $60 on clothing.
    - User A sees:
      ```
      Food: $20
      Clothing: $40
      Remaining Unused: $40
      ```
    - User B sees:
      ```
      Food: $10
      Clothing: $20
      Remaining Unused: $20
      ```

### **4. User Dashboard**

- View donation history with detailed spending breakdowns.
- Visualizations (e.g., pie charts, bar graphs) for donation usage.
- Notifications for updated reports from organizations.

### **5. Organization Dashboard**

- **Registration**: Organizations register with verification (e.g., tax ID, documents).
- **Post Management**:
  - Create funding requests specifying goals and outcomes.
  - Organize events requiring donations.
- **Donation Allocation**:
  - Allocate funds to spending categories (e.g., Food, Medical Aid).
  - Tag expenses to specific donations.
- **Reporting**:
  - Provide spending breakdowns with optional receipts/images as proof.

### **6. Admin Panel**

- Manage and verify organizations.
- Monitor and moderate posts and events.
- Handle donor and organization support requests.

---

## **System Design**

### **Database Schema**

#### **Donations Table**

| Field             | Type    | Description                       |
| ----------------- | ------- | --------------------------------- |
| donation_id       | String  | Unique ID for the donation.       |
| user_id           | String  | Donor’s unique identifier.        |
| org_id            | String  | Organization’s unique identifier. |
| amount            | Decimal | Donation amount.                  |
| type              | Enum    | “general” or “specific” donation. |
| remaining_balance | Decimal | Unused donation balance.          |

#### **Expense Table**

| Field              | Type    | Description                        |
| ------------------ | ------- | ---------------------------------- |
| expense_id         | String  | Unique ID for the expense.         |
| org_id             | String  | Organization’s unique identifier.  |
| amount             | Decimal | Expense amount.                    |
| category           | String  | Expense category (e.g., Food).     |
| linked_donation_id | String  | Related donation ID (if specific). |

#### **Donor-Expense Mapping Table**

| Field       | Type    | Description                              |
| ----------- | ------- | ---------------------------------------- |
| mapping_id  | String  | Unique mapping ID.                       |
| donation_id | String  | Linked donation ID.                      |
| expense_id  | String  | Linked expense ID.                       |
| proportion  | Decimal | Proportional allocation of the donation. |

### **Backend Logic**

- Automated proportional allocation for general donations.
- Real-time generation of reports based on updated expense data.

### **UI/UX Considerations**

- **Donor Experience**:
  - Intuitive dashboards for donation tracking.
  - Clear and transparent reporting with visuals.
- **Organization Experience**:
  - Easy allocation of funds with tagging tools.
  - Simple report submission interface.

---

## **Future Enhancements**

- **Gamification**: Badges for donors based on milestones (e.g., “First Donation”).
- **Recurring Donations**: Allow users to set up periodic contributions.
- **Mobile App**: Develop a mobile app for donors and organizations.
- **AI Insights**: Use AI to suggest organizations or events based on donor preferences.
- **Blockchain Integration**: Ensure immutable and transparent transaction records.

---

## **Key Differentiator**

Charitably focuses on building trust by providing unparalleled transparency in donation tracking. The ability to see how every dollar is utilized encourages donor confidence and increases contributions. By combining a seamless user experience with robust reporting features, Charitably bridges the gap between donors and organizations.

---

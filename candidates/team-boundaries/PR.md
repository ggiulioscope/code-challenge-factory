# Derive billing from the recorded invoice

Before: Finance → orders and invoices; Purchasing → orders. After: Finance → invoices; Purchasing.orderStatus → order lifecycle and Finance.invoiceFor. Finance records the receipt in one SQLite statement. Purchasing combines the facts when asked for status. A committed receipt survives a process exit even if nobody has queried the order yet. A failed read can be retried without replaying a write.

Cancellation takes precedence. Historical orders already marked billed remain readable. Purchasing owns reconciliation of displayed status. Finance verifies receipt evidence. This design adds an indexed lookup for open orders and requires the Finance lookup to be available at read time.

Deploy the compatible reader first and route order-status consumers through it. Drain the old Finance writer, then enable the insert-only path. Keep the new reader on rollback or pause the workflow. Audit historical cases against cancellation evidence separately. Other database consumers of the raw status must migrate before relying on newly derived billing.

A synchronous Purchasing command keeps the stored status queryable for downstream readers but couples receipt recording to a successful second write. Prefer it if raw order status must be authoritative.

Run `npm test` and `npm run typecheck`. The tests exercise both arrival orders through the public workflow.

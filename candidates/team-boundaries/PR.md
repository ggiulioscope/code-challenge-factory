# Give Purchasing ownership of the billing transition

Before: Finance → invoices and orders; Purchasing → orders. After: Finance → invoices and Purchasing.applyInvoice → orders. Finance owns proof of receipt. Purchasing owns the order lifecycle, including the decision to leave a canceled order canceled.

A savepoint covers both operations. Cancellation is an ordinary business outcome and the invoice commits. A database failure unwinds both writes so Finance can retry. SQLite serializes the writes and the status condition is evaluated inside the update. Purchasing investigates disagreements in order state against Finance’s invoice evidence.

Release the Purchasing command first. Switch the Finance writer in one cutover, draining old writers before resuming intake. Roll back by pausing intake or restoring a writer that uses the same command. Existing inconsistent orders require an audit against cancellation evidence before correction.

A projection from Finance receipts would decouple invoice intake from Purchasing availability. Choose it when recording during Purchasing downtime matters more than immediately consistent reads.

Run `npm test` and `npm run typecheck`. The regression covers a late invoice and a forced failure between writes followed by retry.

import Link from 'next/link'

type CheckoutBarProps = {
  totalSelectedSalary: number
  onPrepareCheckout: () => void
}

export function CheckoutBar({ totalSelectedSalary, onPrepareCheckout }: CheckoutBarProps) {
  return (
    <div className="flex justify-between items-center mt-6 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-md p-6">
      <p className="text-lg font-medium text-gray-300">
        Total Selected Salary: ${totalSelectedSalary.toLocaleString()}
      </p>
      <Link
        href="/admin/dashboard/unpaid/checkout"
        onClick={(e) => {
          if (totalSelectedSalary === 0) {
            e.preventDefault()
            return
          }
          onPrepareCheckout()
        }}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
          totalSelectedSalary === 0
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}
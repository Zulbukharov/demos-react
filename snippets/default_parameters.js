// fetchOrders есть оба
function fetchOrders(count = 10, start = 0)
{
	console.log("Getting", count, "orders starting from", start);
}

// есть только первый
function fetchOrdersFirst(count = 10, start)
{
	console.log("Getting", count, "orders starting from", start);
}

// есть только второй
function fetchOrdersSecond(count, start = 0)
{
	console.log("Getting", count, "orders starting from", start);
}

fetchOrders();
fetchOrders(2);
fetchOrdersFirst();
fetchOrdersFirst(100);
fetchOrdersSecond();
fetchOrdersSecond(100);

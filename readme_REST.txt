Pull the full state using REST to gain benefits of HTTP goodies like caching, 
compression, selective encoding, language and data format selection, optional 
requests etc., and then optionally push live updates with WebSockets to keep 
the GUI updated constantly.

Although the Web Sockets protocol is ready to support a diverse set of clients, 
it cannot deliver raw binary data to JavaScript, because JavaScript does not 
support a byte type. 
Therefore, binary data is ignored if the client is JavaScript, but it can be 
delivered to other clients that support it.
`timescale 1ns / 1ps
//-------------------------------------------------------
// File name    : memory.v
// Title        : Memory
// Library      : nanoLADA
// Purpose      : Computer Architecture
// Developers   : Krerk Piromsopa, Ph. D.
//              : Chulalongkorn University.
module memory(data,address,wr,clock,SW_0,SW_1,SW_2,LED_0,LED_1,LED_2,LED_3,nreset);
parameter DATA_WIDTH=32;
parameter ADDR_WIDTH=12;

inout	[DATA_WIDTH-1:0]	data;
input	[ADDR_WIDTH-1:0]	address;
input		wr;
input		clock;
input [DATA_WIDTH-1:0] SW_0;
input [DATA_WIDTH-1:0] SW_1;
input [DATA_WIDTH-1:0] SW_2;
input nreset;
output reg [DATA_WIDTH-1:0] LED_0;
output reg [DATA_WIDTH-1:0] LED_1;
output reg [DATA_WIDTH-1:0] LED_2;
output reg [DATA_WIDTH-1:0] LED_3;

reg	[DATA_WIDTH-1:0]	mem[0:1<<ADDR_WIDTH -1];

reg	[DATA_WIDTH-1:0]	data_out;
// Tri-State buffer
assign data=(wr==0) ? data_out:32'bz;

integer i;
initial
begin
	$readmemb("data.mem",mem);
	LED_0 = 0;
	LED_1 = 0;
	LED_2 = 0;
	LED_3 = 0;
end

always @(address)
begin
	$display("%10d - mem[%h] -  %h\n",$time, address,data_out);	
	case (address)
	   12'b111111111000 : begin data_out = SW_0; end
	   12'b111111111001 : begin data_out = SW_1; end
	   12'b111111111010 : begin data_out = SW_2; end
	   default : begin data_out = mem[address]; end
	endcase
end

always @(posedge clock)
begin : MEM_WRITE
	if (wr) begin
	    case (address)
	       12'b111111111100 : begin LED_0 = data; end
           12'b111111111101 : begin LED_1 = data; end
           12'b111111111110 : begin LED_2 = data; end
           12'b111111111111 : begin LED_3 = data; end
		   default : begin mem[address]=data; end
		endcase
		$display("%10d - MEM[%h] <- %h",$time, address, data);
	end
end

endmodule
`timescale 1ns / 1ps
//-------------------------------------------------------
// File name    : nano_sc_system.v
// Title        : nanoCPU Single Cycle system.
// Library      : nanoLADA
// Purpose      : Computer Architecture
// Developers   : Krerk Piromsopa, Ph. D.
//              : Chulalongkorn University.

module nano_sc_system(
    input wire [3:0] A,
    input wire [3:0] B,
    input wire [3:0] Op,
    input wire clock,
    output wire [3:0] An,
    output wire [6:0] C_LED
);
wire 	[31:0]	p_address;
wire 	[31:0]	p_data;
wire	[31:0]	d_address;
wire		mem_wr;
wire	[31:0]	d_data;
reg		nreset=1;

wire [31:0] LED_0;
wire [31:0] LED_1;
wire [31:0] LED_2;
wire [31:0] LED_3;
reg [31:0] SW_0;
reg [31:0] SW_1;
reg [31:0] SW_2;
initial begin
    SW_0 = 0;
    SW_1 = 0;
    SW_2 = 0;
end

always @(A,B,Op) begin
    SW_0 = {28'b0000000000000000000000000000,A};
    SW_1 = {28'b0000000000000000000000000000,B};
    SW_2 = {28'b0000000000000000000000000000,Op};
end

nanocpu	CPU(p_address,p_data,d_address,d_data,mem_wr,clock,nreset);
rom 	PROGMEM(p_data,p_address[13:2]);
memory 	DATAMEM(d_data,d_address[13:2],mem_wr,clock,SW_0,SW_1,SW_2,LED_0,LED_1,LED_2,LED_3,nreset);
SevenSegment OutputUnit(LED_0[3:0],LED_1[3:0],LED_2[3:0],LED_3[3:0],clock,C_LED,An);

endmodule
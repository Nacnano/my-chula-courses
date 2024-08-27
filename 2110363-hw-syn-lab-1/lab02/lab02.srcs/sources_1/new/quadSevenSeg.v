`timescale 1ns / 1ps

module quadSevenSeg(
    output [6:0] seg,
    output dp,
    output an0,
    output an1,
    output an2,
    output an3,
    input [3:0] num0, // most right
    input [3:0] num1,
    input [3:0] num2,
    input [3:0] num3, // most left
    input clk
    );
    
    reg [1:0] ns; // next stage
    reg [1:0] ps; // present stage
    reg [3:0] dispEn; // which 7seg is active
    
    reg [3:0] hexIn;
    wire [6:0] segments;
    assign seg=segments;
    
    hexTo7Segment segDecode(segments,hexIn);
    assign dp=0; // dot point corresponse with activated an
    assign {an3,an2,an1,an0}=~dispEn;

    // state transition every clock
    always @(posedge clk)
        ps=ns;
    
    // 3 below sequences work parallelly
    always @(ps) 
        ns=ps+1;
    
    always @(ps)
        case(ps)
            2'b00: dispEn=4'b0001;
            2'b01: dispEn=4'b0010;
            2'b10: dispEn=4'b0100;
            2'b11: dispEn=4'b1000;
        endcase
    
    always @(ps)
        case(ps)
            2'b00: hexIn=num0;
            2'b01: hexIn=num1;
            2'b10: hexIn=num2;
            2'b11: hexIn=num3;
        endcase
    
endmodule
public class Complex 
{
	// attributes: (re) + j(im)
	private double re;
	private double im;
	
	// constructors
	public Complex(){
		this(0,0);
	}
	public Complex(double r, double i){
		re = r;
		im = i;
	}
	public Complex(Complex z){
		this(z.getRe(),z.getIm());
	}
	
	//accessor methods
	public double getRe(){
		return re;
	}
	public double getIm(){
		return im;
	}

	//mutator methods
	public void setRe(double r){
		re = r;
	}
	public void setIm(double i){
		im = i;
	}

	//other methods
	public Complex adds(Complex z){
		return new Complex(re+z.getRe(),im+z.getIm());
	}
	public Complex subtracts(Complex z){
		return new Complex(re-z.getRe(),im-z.getIm());
	}
	public Complex multiplies(Complex z){
		double r = re*z.getRe()-im*z.getIm();
		double i = im*z.getRe()+re*z.getIm();
		return new Complex(r,i);
	}
	public Complex divides(Complex z){
		return this.multiplies(z.multInverse());
	}
	public Complex multInverse(){
		double den = Math.pow(this.magnitude(),2);
		return new Complex(re/den,-im/den);
	}
	public Complex conjugate(){
		return new Complex(re,-im);	
	}
	public double magnitude(){
		return Math.sqrt(re*re+im*im);
	}
	public String toString(){	
		if(im>=0)
			return re+"+j"+im;
		else
			return re+"-j"+(-im);
	}
}

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Package, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const isLowStock = product.quantity < 10;
  const isOutOfStock = product.quantity === 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-card/60 backdrop-blur-sm hover:bg-card/80 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Package className="h-16 w-16 text-muted-foreground" />
          )}
          
          {/* Stock status overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-destructive/80 flex items-center justify-center">
              <Badge variant="destructive" className="text-xs">OUT OF STOCK</Badge>
            </div>
          )}
          
          {/* Category badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 text-xs bg-background/80 backdrop-blur-sm"
          >
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </div>
          
          <div className="flex items-center gap-2">
            {isLowStock && !isOutOfStock && (
              <AlertCircle className="h-4 w-4 text-orange-500" />
            )}
            <span className={`text-sm font-medium ${
              isOutOfStock 
                ? 'text-destructive' 
                : isLowStock 
                  ? 'text-orange-500' 
                  : 'text-muted-foreground'
            }`}>
              Stock: {product.quantity}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(product)}
          className="flex-1 hover:bg-primary hover:text-primary-foreground border-border"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(product.id)}
          className="flex-1 hover:bg-destructive hover:text-destructive-foreground border-border"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};